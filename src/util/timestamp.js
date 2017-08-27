const timestamp = () => {
  let date = new Date();
  return Math.floor(date.getTime()/1000);
}

export default timestamp;
