/* eslint-disable */
const createScheduler = require('probot-scheduler')
const Stale = require('./lib/stale')

module.exports = async robot => {
  // Visit all repositories to mark and sweep stale issues
  const scheduler = createScheduler(robot)

  // Unmark stale issues if a user comments
  const events = [
    'issue_comment',
    'issues',
    'pull_request',
    'pull_request_review',
    'pull_request_review_comment'
  ]

  robot.on(events, unmark)
  robot.on('schedule.repository', markAndSweep)

  async function setupLabels(context) {
    console.log("RUNNING");
    const stale = await forRepository(context)
    var owner = context["payload"]["pull_request"]["head"]["repo"]["owner"]["login"];
    var repo = context["payload"]["pull_request"]["head"]["repo"]["name"];
    fetchLabels = context.github.issues.getLabels(owner, repo);
    const customLabels = JSON.parse(fs.readFileSync('labels.json', 'utf8'));
    const toBeCreated = [];
    for (let i = 0; i < Object.keys(customLabels).length; i += 1) {
      let labelExists = false;
      for (let ii = 0; ii < fetchLabels.length; ii += 1) {
        if (fetchLabels[ii].name === Object.keys(customLabels)[i]) {
          labelExists = true;
        }
      }

      if (!labelExists) {
        const labelObj = {};
        labelObj[Object.keys(customLabels)[i]] = customLabels[Object.keys(customLabels)[i]];
        toBeCreated.push(labelObj);
      }
    }
    for (let labelindex = 0; labelindex < toBeCreated.length; labelindex += 1) {
      console.log("creating label");
      labelOBJ = toBeCreated[labelindex];
      labelName = Object.keys(labelOBJ)[0];
      context.github.issues.createLabel(owner, repo, labelName, labelOBJ[labelName]['color'], labelOBJ[labelName]['description']);
    }
  }
  async function unmark (context) {
    setupLabels(context);
    if (!context.isBot) {
      const stale = await forRepository(context)
      let issue = context.payload.issue || context.payload.pull_request
      const type = context.payload.issue ? 'issues' : 'pulls'

      console.log(JSON.stringify(issue.labels));
      // Some payloads don't include labels
      if (!issue.labels) {
        try {
          issue = (await context.github.issues.get(context.issue())).data
        } catch (error) {
          context.log('Issue not found')
        }
      }

      const staleLabelAdded = context.payload.action === 'labeled' &&
        context.payload.label.name === stale.config.staleLabel

      if (stale.hasStaleLabel(type, issue) && issue.state !== 'closed' && !staleLabelAdded) {
        stale.unmark(type, issue)
      }
    }
  }

  async function markAndSweep (context) {
    const stale = await forRepository(context)
    await stale.markAndSweep('pulls')
    await stale.markAndSweep('issues')
  }

  async function forRepository (context) {
    let config = await context.config('stale.yml')

    if (!config) {
      scheduler.stop(context.payload.repository)
      // Don't actually perform for repository without a config
      config = {perform: false}
    }

    config = Object.assign(config, context.repo({logger: robot.log}))

    return new Stale(context.github, config)
  }
}
