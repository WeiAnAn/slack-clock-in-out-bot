function formatTime(time) {
  let formatedStr = '';
  time = Math.floor(time);
  const seconds = time % 60;
  formatedStr = `${seconds}s`.concat(formatedStr);
  if (!(time = Math.floor(time / 60))) {
    return formatedStr;
  }

  const minutes = time % 60;
  formatedStr = `${minutes}m `.concat(formatedStr);
  if (!(time = Math.floor(time / 60))) {
    return formatedStr;
  }

  formatedStr = `${time}h `.concat(formatedStr);
  return formatedStr;
}

module.exports = formatTime;
