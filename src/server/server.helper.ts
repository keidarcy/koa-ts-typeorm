import fs from 'fs';
import path from 'path';

function callback(err) {
  if (err) throw err;
  console.log('copied');
}

export default () => {
  fs.copyFile(
    path.resolve(__dirname, '../components/Home/card.css'),
    path.resolve(__dirname, '../assets/vcs.css.liquid'),
    callback
  );
};
