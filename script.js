document.addEventListener("DOMContentLoaded", function() {

    // obsluga zasad gry
    const rules_button = document.getElementById('rules_button');
    const rules = document.querySelector('.rules');

    rules_button.addEventListener('click', function () {
        rules.classList.toggle('hidden');
    });

    // tabela oraz xyz, przyciski ktorymi sie bedzie wieze obslugiwalo
    const table = document.querySelectorAll('tr');
    const X = document.querySelector('.x'); // przyciski przenoszace krazki
    const Y = document.querySelector('.y');
    const Z = document.querySelector('.z');
    let table2 = [];
    let number_of_discs = 5;
    const three_discs = document.querySelector('.disc3'); // pobieram sobie porzyciski
    const four_discs = document.querySelector('.disc4');
    const five_discs = document.querySelector('.disc5');
    const six_discs = document.querySelector('.disc6');
    const seven_discs = document.querySelector('.disc7');
    const eight_discs = document.querySelector('.disc8');

    three_discs.addEventListener('click', function () { // ustalam ile chce miec krazkow
        number_of_discs = this.innerText;
    });
    four_discs.addEventListener('click', function () {
        number_of_discs = this.innerText;
    });
    five_discs.addEventListener('click', function () {
        number_of_discs = this.innerText;
    });
    six_discs.addEventListener('click', function () {
        number_of_discs = this.innerText;
    });
    seven_discs.addEventListener('click', function () {
        number_of_discs = this.innerText;
    });
    eight_discs.addEventListener('click', function () {
        number_of_discs = this.innerText;
    });

    // poczatek gry, uklada krazki
    const start_game = function (discs) {
        let set_discs = discs;
        for (let j = 0; j < 3; j++) {
            for (let i = 0; i < 10; i++) {
                table[i].children[j].innerText = '';
            }
        } // czyszczenie tablicy
        let counter = 0;
        for (let k = 9; k > 9 - set_discs; k--) {
            table[k].children[0].innerText = set_discs - counter;
            counter++;
        }
    }

    const start_button = document.getElementById('start_button');
    start_button.addEventListener('click', function () {
        start_game(number_of_discs);
    });


    // funkcja poruszajaca krazek
    const move_top = function (row) {
        for (let i = 0; i < 3; i++) { // to co pobralem - table - to nie tablica tylko jakis obiekt a pozniej przyda mi sie tablica jednak
            table2.push(table[0].children[i].innerText);
        }

        console.log(table2);
        if (table[0].children[row].innerText != '') {
            let value = table[0].children[row].innerText;
            table[0].children[row].innerText = '';
            for (let i = 0; i < 11; i++) {
                if (table[i].children[row].innerText == '') {
                    console.log('do nothing');
                }
                else {
                    table[i - 1].children[row].innerText = value;
                    break;
                }
            }
        } // krazek u gory w tej kolumnie co przycisk wiec wraca na dol

        else if (table[0].children[0].innerText != '') { // jesli sie nie znajduje u gory, sprawdzam czy jest w innej kolumnie u gory, jak tak, przeciagam go na obecny stos, jak nie z obecnego idzie do gory
            if (table[9].children[row].innerText == '') {
                table[9].children[row].innerText = table[0].children[0].innerText;
                table[0].children[0].innerText = '';
            } else {
                for (let i = 0; i < 11; i++) {
                    if (table[i].children[row].innerText == '') {
                        console.log('do nothing');
                    }
                    else {
                        if (table[i].children[row].innerText > table[0].children[0].innerText) {
                            table[i - 1].children[row].innerText = table[0].children[0].innerText;
                            table[0].children[0].innerText = '';
                        }
                        else {
                            alert('niedozwolony ruch');
                        }
                        break;
                    }
                }
            }
        }
        else if (table[0].children[1].innerText != '') { // jesli sie nie znajduje u gory, sprawdzam czy jest w innej kolumnie u gory, jak tak, przeciagam go na obecny stos, jak nie z obecnego idzie do gory
            if (table[9].children[row].innerText == '') {
                table[9].children[row].innerText = table[0].children[1].innerText;
                table[0].children[1].innerText = '';
            } else {
                for (let i = 0; i < 11; i++) {
                    if (table[i].children[row].innerText == '') {
                        console.log('do nothing');
                    }
                    else {
                        if (table[i].children[row].innerText > table[0].children[1].innerText) {
                            table[i - 1].children[row].innerText = table[0].children[1].innerText;
                            table[0].children[1].innerText = '';
                        }
                        else {
                            alert('niedozwolony ruch');
                        }
                        break;
                    }
                }
            }
        }
        else if (table[0].children[2].innerText != '') { // jesli sie nie znajduje u gory, sprawdzam czy jest w innej kolumnie u gory, jak tak, przeciagam go na obecny stos, jak nie z obecnego idzie do gory
            if (table[9].children[row].innerText == '') {
                table[9].children[row].innerText = table[0].children[2].innerText;
                table[0].children[2].innerText = '';
            } else {
                for (let i = 0; i < 11; i++) {
                    if (table[i].children[row].innerText == '') {
                        console.log('do nothing');
                    }
                    else {
                        if (table[i].children[row].innerText > table[0].children[2].innerText) {
                            table[i - 1].children[row].innerText = table[0].children[2].innerText;
                            table[0].children[2].innerText = '';
                        }
                        else {
                            alert('niedozwolony ruch');
                        }
                        break;
                    }
                }
            }
        }
        else {
            for (let i = 0; i < 10; i++) {
                if (table[i].children[row].innerText != '') {
                    table[0].children[row].innerText = table[i].children[row].innerText;
                    table[i].children[row].innerText = '';
                    break;
                } else {
                    console.log('do nothing');
                }
            } // podnoszenie do gory
        }
        if (table[9].children[0].innerText == '' && table[9].children[1].innerText == '' &&
            table[0].children[0].innerText == '' && table[0].children[1].innerText == '') {
            alert('wygrales');
        }
    }

    // podpiecie funkcji przesuwajacej krazek do przycisku odpowiedniego
    X.addEventListener('click', function () {
        move_top(X.innerText)
    }); // listenery do gry
    Y.addEventListener('click', function () {
        move_top(Y.innerText)
    });
    Z.addEventListener('click', function () {
        move_top(Z.innerText)
    });

    // gdyby ktos chcial podpowiedz i ma jakis krazek u gory, funkcja sciaga go na dol
    const auto_solve_prepare = function () {
        if (table[0].children[0].innerText != ''){
            table[check_col(0)[0]-1].children[0].innerText = table[0].children[0].innerText;
            table[0].children[0].innerText = '';
        }
        if(table[0].children[1].innerText != '' ) {
            table[check_col(1)[0] - 1].children[1].innerText = table[0].children[1].innerText;
            table[0].children[1].innerText = '';
        }
        if(table[0].children[2].innerText != '') {
            table[check_col(2)[0]-1].children[2].innerText = table[0].children[2].innerText;
            table[0].children[2].innerText = '';
        }
    }

    // przesuwa krazek 1 o jedno pole w przod
    const move1_auto = function(){
        for (let j = 0; j < 3; j++) {
            for (let i = 0; i < 10; i++) {
                if(table[i].children[j].innerText == '1'){ // szukam jedynki, przesunac ja chce o 1 pole
                    if(j==2){ // dziala gdy 1 musi wrocic na poczatek
                        for(let k=0; k<11; k++){
                            if(table[k].children[j-2].innerText != ''){
                                table[k-1].children[j-2].innerText = table[i].children[j].innerText;
                                table[i].children[j].innerText = '';
                                return [k-1, j-2];
                            }
                        }
                    }
                    else{  // dziala gdy 1 przeskakuje na kolejna wierze
                        for(let k=0; k<11; k++){
                            if(table[k].children[j+1].innerText != ''){
                                table[k-1].children[j+1].innerText = table[i].children[j].innerText;
                                table[i].children[j].innerText = '';
                                return [k-1, j+1];
                            }
                        }
                    }
                }
            }
        }
    }

    // w koncu sie zdecydowalem to napisac...ile razy mozna robic to samo..
    const check_col = function(col){
        if(table[9].children[col].innerText == ''){
            return [10, col, 10];
        }
        else{
            for(let i=0; i<10; i++){
                if(table[i].children[col].innerText != ''){
                    return [i, col, table[i].children[col].innerText];
                }
            }
        }
    }

    // drugi ruch to przesuniecie mniejszego krazka na wiekszy, pomijamy "1"
    const move2_auto = function(){
        if(check_col(0)[2] == '1'){
            if(check_col(1)[2] == '10' && check_col(2)[2] == '10'){
                console.log('do nothing');
            }
            else if(check_col(1)[2] >= check_col(2)[2]){
                table[check_col(1)[0]-1].children[1].innerText = table[check_col(2)[0]].children[2].innerText;
                table[check_col(2)[0]].children[2].innerText = '';
                return;
            }
            else{
                table[check_col(2)[0]-1].children[2].innerText = table[check_col(1)[0]].children[1].innerText;
                table[check_col(1)[0]].children[1].innerText = '';
                return;
            }
        }
        else if(check_col(1)[2] == '1'){
            if(check_col(0)[2] == '10' && check_col(2)[2] == '10'){
                console.log('do nothing');
            }
            else if(check_col(0)[2] >= check_col(2)[2]){
                table[check_col(0)[0]-1].children[0].innerText = table[check_col(2)[0]].children[2].innerText;
                table[check_col(2)[0]].children[2].innerText = '';
                return;
            }
            else{
                table[check_col(2)[0]-1].children[2].innerText = table[check_col(0)[0]].children[0].innerText;
                table[check_col(0)[0]].children[0].innerText = '';
                return;
            }
        }
        else if(check_col(2)[2] == '1'){
            if(check_col(1)[2] == '10' && check_col(0)[2] == '10'){
                console.log('do nothing');
            }
            else if(check_col(1)[2] >= check_col(0)[2]){
                table[check_col(1)[0]-1].children[1].innerText = table[check_col(0)[0]].children[0].innerText;
                table[check_col(0)[0]].children[0].innerText = '';
                return;
            }
            else{
                table[check_col(0)[0]-1].children[0].innerText = table[check_col(1)[0]].children[1].innerText;
                table[check_col(1)[0]].children[1].innerText = '';
                return;
            }
        }

    }


    // podpiecie funkcji odpowiednio do przycisku help
    const help_button = document.getElementById('help_button');
    help_button.addEventListener('click', function () {
        auto_solve_prepare();
        move1_auto();
        move2_auto();
        if (table[9].children[0].innerText == '' && table[9].children[1].innerText == '' &&
            table[0].children[0].innerText == '' && table[0].children[1].innerText == '') {
            alert('wygrales');
        }
    });

});