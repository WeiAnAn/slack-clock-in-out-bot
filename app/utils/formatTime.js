function formatTime(time) {
  let formatedStr = '';
  time = Math.floor(time);

  const seconds = time % 60;
  if (seconds) formatedStr = `${seconds}s`;

  if (!(time = Math.floor(time / 60))) {
    return formatedStr;
  }

  const minutes = time % 60;
  if (minutes)
    formatedStr = `${minutes}m` + (formatedStr ? ' ' + formatedStr : '');
  if (!(time = Math.floor(time / 60))) {
    return formatedStr;
  }

  formatedStr = `${time}h` + (formatedStr ? ' ' + formatedStr : '');
  return formatedStr;
}

module.exports = formatTime;
