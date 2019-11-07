document.addEventListener("DOMContentLoaded", function() {

    // obsluga zasad gry
    const rules_button = document.getElementById('rules_button');
    const rules = document.querySelector('.rules');

    rules_button.addEventListener('click', function () {
        rules.classList.toggle('hidden');
    });

    //licznik ruchow
    const moves_counter = document.querySelector('.moves_counter input');

    // tabela oraz xyz, przyciski ktorymi sie bedzie wieze obslugiwalo
    const table = document.querySelectorAll('tr');
    let number_of_discs = 5;  // startowa ilosc dyskow
    const tower_height = document.querySelector('.tower_height');

    // ilosc krazkow w grze
    tower_height.addEventListener('click', function (e) { // this nie dziala bo wskazuje na window, zostalo bondowanie lub obejscie jak ja to zrobilem
        number_of_discs = e.target.innerText;
    });

    // poczatek gry, uklada krazki
    const start_game = function (discs) {
        let set_discs = discs;
        moves_counter.value =0;
        for (let j = 0; j < 3; j++) {
            for (let i = 0; i < 10; i++) {
                table[i].children[j].innerHTML = '';
            }
        } // czyszczenie tablicy
        let counter = 0;
        for (let k = 9; k > 9 - set_discs; k--) {
            table[k].children[0].innerHTML = '<img src="'+(set_discs - counter)+'.jpg">';
            counter++;
        }
    }

    const start_button = document.getElementById('start_button');
    start_button.addEventListener('click', function () {
        start_game(number_of_discs);
    });

    const you_won = function(){  // warunek wygranej
        if (table[9].children[0].innerHTML == '' && table[9].children[1].innerHTML == '' &&
            table[0].children[0].innerHTML == '' && table[0].children[1].innerHTML == '') {
        alert('wygrales');
        }
    }

    // funkcja poruszajaca krazek manualnie
    const move_manual = function (row) {
        let value;
        if (table[0].children[row].innerHTML != '') {// krazek u gory w tej kolumnie co przycisk wiec wraca na dol
            value = table[0].children[row].innerHTML;  // musze to zrobic przez zmienna inaczej nie bede w stanie uzyc funkcji check_col
            table[0].children[row].innerHTML = '';
            table[check_col(row)[0] - 1].children[row].innerHTML = value;
            return;
        }
        for (let i=0; i<3; i++) {
            if (table[0].children[i].innerHTML != '') { // jesli krazek jest u gory, ale nie w kolumnie ktora klikam
                if (table[9].children[row].innerHTML == '') { // jesli kolumna w ktora klikam jest pusta, przenosze tam krazek
                    table[9].children[row].innerHTML = table[0].children[i].innerHTML;
                    table[0].children[i].innerHTML = '';
                    moves_counter.value++;
                    return;
                } else {  // jesli nie jest pusta
                    if (table[check_col(row)[0]].children[row].innerHTML < table[0].children[i].innerHTML) { // jesli krazek w kolumnie kliknietej jest mniejszy - blad
                        alert('niedozwolony ruch');
                        moves_counter.value++;
                        return;
                    } else { // jest wiekszy - przenosze krazek
                        table[check_col(row)[0] - 1].children[row].innerHTML = table[0].children[i].innerHTML;
                        table[0].children[i].innerHTML = '';
                        moves_counter.value++;
                        you_won();
                        return;
                    }
                }
            }
        }
        if(table[9].children[row].innerHTML != ''){ // jesli petla dojdzie az tu i jest tam jakis krazek, podnosze go do gory
            value = table[check_col(row)[0]].children[row].innerHTML;
            table[check_col(row)[0]].children[row].innerHTML = '';
            table[0].children[row].innerHTML = value;
            return;
        }
    }

    // podpiecie funkcji przesuwajacej krazek do przycisku odpowiedniego
    table[10].addEventListener('click', function (e) { // tu tez nie trzeba 3 listenerow
        move_manual(e.target.innerText);
    }); // listenery do gry

    // gdyby ktos chcial podpowiedz i ma jakis krazek u gory, funkcja sciaga go na dol
    const auto_solve_prepare = function () {
        let value; // ze wzgledu na wyglad funkcji check_col trzeba uzyc zmiennej posredniej inaczej sie wywala
        for(let i=0; i<3; i++){
            if(table[0].children[i].innerHTML != ''){
                value = table[0].children[i].innerHTML;
                table[0].children[i].innerHTML = '';
                table[check_col(i)[0]-1].children[i].innerHTML = value;
            }
        }
    }

    // przesuwa krazek 1 o jedno pole w przod
    const move1_auto = function(){
        for (let j = 0; j < 3; j++) {
            for (let i = 0; i < 10; i++) {
                if(table[i].children[j].innerHTML == '<img src="1.jpg">'){ // szukam jedynki, przesunac ja chce o 1 pole
                    if(j==2){ // dziala gdy 1 musi wrocic na poczatek
                                table[check_col(j-2)[0]-1].children[j-2].innerHTML = table[i].children[j].innerHTML;
                                table[i].children[j].innerHTML = '';
                                moves_counter.value++;
                                return;
                    }
                    else{  // dziala gdy 1 przeskakuje na kolejna wierze
                                table[check_col(j+1)[0]-1].children[j+1].innerHTML = table[i].children[j].innerHTML;
                                table[i].children[j].innerHTML = '';
                                moves_counter.value++;
                                return;
                    }
                }
            }
        }
    }

    // w koncu sie zdecydowalem to napisac...ile razy mozna robic to samo..
    const check_col = function(col){
        if(table[9].children[col].innerHTML == ''){
            return [10, col, 'a'];
        }
        else{
            for(let i=0; i<10; i++){
                if(table[i].children[col].innerHTML != ''){
                    return [i, col, table[i].children[col].innerHTML];
                }
            }
        }
    }

    // drugi ruch to przesuniecie mniejszego krazka na wiekszy, pomijamy "1"
    const move2_auto = function(){
        let x; // funkcja kiedys skladala sie z 3 ifow, a przy uzyciu 2 zmiennych poprawie to
        let y;
        for(let i=0; i < 3; i++){
            if(check_col(i)[2] == '<img src="1.jpg">'){
                if(i == 0){
                    x = 2;
                    y = 1;
                }
                else if(i == 1){
                    x = 0;
                    y = 2;
                }
                else{
                    x = 1;
                    y = 0;
                }
            }
        }
        if(check_col(x)[2] == 'a' && check_col(y)[2] == 'a'){
            return;
        }
        else if(check_col(x)[2] > check_col(y)[2]){
            table[check_col(x)[0]-1].children[x].innerHTML = table[check_col(y)[0]].children[y].innerHTML;
            table[check_col(y)[0]].children[y].innerHTML = '';
            moves_counter.value++;
            return;
        }
        else {
            table[check_col(y)[0] - 1].children[y].innerHTML = table[check_col(x)[0]].children[x].innerHTML;
            table[check_col(x)[0]].children[x].innerHTML = '';
            moves_counter.value++;
            return;
        }
    }

    // podpiecie funkcji odpowiednio do przycisku help
    const help_button = document.getElementById('help_button');
    help_button.addEventListener('click', function () {
        auto_solve_prepare();
        move1_auto();
        move2_auto();
        you_won();
    });

});