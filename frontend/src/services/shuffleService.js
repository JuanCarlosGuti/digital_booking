export default function shuffle (array)  {
    let currentIndex = array.length;
    let randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      let aux = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = aux;
    }
    return array;
  };