const fs = require('fs')

const writeChannel = (cname) => {

const jsCode = `
import React from 'react';

const ${cname} = () => {
  return (
    <div>
    </div>
  );
};

export default ${cname};
`;

const fileName = `${cname}.js`;

fs.writeFile(fileName, jsCode, (err) => {
  if (err) {
    console.error(`Error writing file "${fileName}":`, err);
  } else {
    console.log(`File "${fileName}" has been created.`);
  }
});
}

export default writeChannel;