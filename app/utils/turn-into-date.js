export default function turnIntoDate(date, dateSuffix) {
  // Here we are formatting the date like rails likes it
  let a = date.substring(6,10) + '-' + date.substring(0,2) + '-' + date.substring(3,5);

  // If the date is BC we are adding that suffix, otherwise we are not adding anything.
  if(dateSuffix==='BC'){
    a = a + " " + dateSuffix;
  }
  return a;
}
