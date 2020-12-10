// lista osob
var give = ['Joanna', 'Tomasz', 'Robert', 'Ewa'];
// kopiujemy liste
var receive = give.slice();
// wyniki
var results = new Array();

// pobieramy elementy ze strony
var people = document.getElementById('people');
var choose = document.getElementById('choose');
var result = document.getElementById('result');
var close = document.getElementById('close');

function drawList() {
   people.innerHTML = '<option value>Kim jesteś?</option>';
   for(let i = give.length - 1; i >= 0; i--) {
      let option = document.createElement('option');
      option.value = i;
      option.innerHTML = give[i];
      people.appendChild(option);
   }
}

function selectPerson(personID) {
   var name = give[personID];
   var nameIndex = receive.indexOf(name); 

   // console.log(`Losuje ${name}[${nameIndex}]`);

   // usuwamy siebie z "do wylosowania"
   if (nameIndex >= 0) {
      receive.splice(nameIndex, 1);
   }

   // losujemy osobę
   var recipient = ~~(Math.random() * receive.length);
   var recipientName = receive[recipient];

   // console.log(`Wylosowano ${recipientName}[${recipient}]`);

   // dodajemy wynik
   if(recipientName != undefined)
      results[name] = recipientName;
   else 
      results[name] = 'siebie';
      
   // usuwamy wylosowanego i losującego
   give.splice(nameIndex, 1);
   receive.splice(recipient, 1);

   // dodajemy siebie do "do wylosowania"
   if (nameIndex >= 0) {
      receive.push(name);
   }

   // wypisanie informacji na ekranie
   result.innerHTML = `<h2>${name} wylosowała ${recipientName} !</h2>`;
   if (recipientName == undefined)
      result.innerHTML = `<h2>${name} nie masz przyjaciół!</h2>`;
   close.innerHTML = `Okej, wyczyść ekran.`;

   if(give.length >= 0) {
      drawList();

      if(give.length == 0)
         close.innerHTML = 'Pokaż wyniki';
   }

}

choose.onclick = () => {
   if (people.value) {
      selectPerson(people.value);
   }
};

close.onclick = function () {
   result.innerHTML = "";
   close.innerHTML = "";
   if (give.length == 0) {
      peopleWrap.parentNode.removeChild(peopleWrap);
      choose.parentNode.removeChild(choose);
      result.innerHTML = "<h2>Wszystko gotowe!</h2>";
      for (res in results) {
         result.innerHTML += `${res} wylosował ${results[res]} <br>`;
      }
      close.innerHTML = "";
   }
};

drawList();