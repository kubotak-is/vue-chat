const displaytime = (timestamp) => {
  let date = new Date(timestamp * 1000);
  let diff = new Date().getTime() - date.getTime();
  let d    = new Date(diff);

  if (d.getUTCFullYear() - 1970) {
    return d.getUTCFullYear() - 1970 + '年前'
  } else if (d.getUTCMonth()) {
      return d.getUTCMonth() + 'ヶ月前'
  } else if (d.getUTCDate() - 1) {
      return d.getUTCDate() - 1 + '日前'
  } else if (d.getUTCHours()) {
      return d.getUTCHours() + '時間前'
  } else if (d.getUTCMinutes()) {
      return d.getUTCMinutes() + '分前'
  } else {
      return d.getUTCSeconds() + '秒前'
  }
}

export default displaytime;
