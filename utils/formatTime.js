function formatTime(time) {
  let formatedStr = '';

  const seconds = time % 60;
  formatedStr = `${seconds}s`.concat(formatedStr);
  if (!(time = Math.floor(time / 60))) {
    return formatedStr;
  }

  const minutes = time % 60;
  formatedStr = ` ${minutes}m`.concat(formatedStr);
  if (!(time = Math.floor(time / 60))) {
    return formatedStr;
  }

  const hours = time % 24;
  formatedStr = ` ${hours}h `.concat(formatedStr);
  // if (!(time = Math.floor(time / 60))) {
  return formatedStr;
  // }

  // const days = Math.floor(time / 24);
  // formatedStr = `${days}d `.concat(formatedStr);
  // return formatedStr;
}

module.exports = formatTime;
