/* eslint-disable */

const fs = require('fs');

const fetchLabels = [
  {
    id: 815479855,
    url: 'https://api.github.com/repos/probotics2018/test/labels/bug',
    name: 'bug',
    color: 'd73a4a',
    default: true,
  },
  {
    id: 815479856,
    url: 'https://api.github.com/repos/probotics2018/test/labels/duplicate',
    name: 'duplicate',
    color: 'cfd3d7',
    default: true,
  },
  {
    id: 815479856,
    url: 'https://api.github.com/repos/probotics2018/test/labels/duplicate',
    name: 'urgfent',
    color: 'cfd3d7',
    default: true,
  },
];
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
console.log(toBeCreated);
for (let labelindex = 0; labelindex < toBeCreated.length; labelindex += 1) {
  labelOBJ = toBeCreated[labelindex];
  labelName = Object.keys(labelOBJ)[0];
  console.log(labelName, labelOBJ[labelName]['color'], labelOBJ[labelName]['description']);
}
