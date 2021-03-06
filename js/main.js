var list = [
    {"desc": "rice tio João", "amount": "1", "value": "5.22"}, // obj 1
    {"desc": "beer bramha", "amount": "12", "value": "1.50"}, // obj 2
    {"desc": "meat friboi", "amount": "2", "value": "10.01"}, // obj 3 ...
];

function getTotal(list) {
    var total = 0;
    for (var key in list) {
        total += list[key].value * list[key].amount;
    }
    document.getElementById("totalValue").innerHTML = formatValue(total);
    //return total;
}

function setList(list) {
    var table = '<thead><tr><td>Description</td><td>Amount</td><td>value</td><td>Action</td></tr></thead><tbody>';
    for (var key in list) {
        table += '<tr><td>' + formatDesc(list[key].desc) + '</td><td>' + formatAmount(list[key].amount) + '</td><td>' + formatValue(list[key].value) + '</td><td><button class="btn btn-info" onclick="setUpdade(' + key + ');">Edit</button> <button class="btn btn-danger" onclick="deletData(' + key + ');">Del</button></td></tr>';
    }
    table += '</tbody>';
    document.getElementById("listTable").innerHTML = table;
    getTotal(list);
    saveListStorage(list)
}

function formatDesc(desc) {
    var str = desc.toLowerCase();
    str = str.charAt(0).toUpperCase() + str.slice(1);
    return str;
}

function formatAmount(amount) {
    return parseInt(amount);
}

function formatValue(value) {
    var str = parseFloat(value).toFixed(2) + " ";
    str = str.replace(".", ",");
    str = "$ " + str;
    return str;
}

function addData() {
    if (!validation()) {
        return;
    }
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;

    //adiciona o elemento na lista
    list.unshift({"desc": desc, "amount": amount, "value": value});
    setList(list);
}

function setUpdade(id) {
    var obj = list[id];
    document.getElementById("desc").value = obj.desc;
    document.getElementById("amount").value = obj.amount;
    document.getElementById("value").value = obj.value;

    document.getElementById("btnUpdate").style.display = "inline-block";
    document.getElementById("btnAdd").style.display = "none";

    // span invisível para pegar o id para atualizar os dados
    document.getElementById("inputIdUpdate").innerHTML = '<input id="idUpdate" type="hidden" value="' + id + '">';
}

function resetForm() {
    document.getElementById("desc").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("value").value = "";

    document.getElementById("btnUpdate").style.display = "none";
    document.getElementById("btnAdd").style.display = "inline-block";

    //limpando span que pega o id do usuário
    document.getElementById("inputIdUpdate").innerHTML = "";
    document.getElementById("errors").style.display = "none";
}

function updateData() {
    if (!validation()) {
        return;
    }
    var id = document.getElementById("idUpdate").value;
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;

    list[id] = {"desc": desc, "amount": amount, "value": value};
    resetForm();
    setList(list);
}

function deletData(id) {
    if (confirm("Delete this item")) {
        if (id === list.length - 1) {
            list.pop();
        } else if (id === 0) {
            list.shift();
        } else {
            var arrAuxIni = list.slice(0, id);
            var arrAuxEnd = list.slice(id + 1);
            list = arrAuxIni.concat(arrAuxEnd);
        }
        setList(list);
    }
}

function validation() {
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;
    var errors = "";

    document.getElementById("errors").style.display = "none";

    if (desc === "") {
        errors += '<p>Fill out Description!</p>';
    }
    if (amount === "") {
        errors += '<p>Fill out a quantity</p>';
    } else if (amount != parseInt(amount)) {
        errors += '<p>Fill out valid amount!</p>';
    }
    if (value === "") {
        errors += '<p>Fill out a Value</p>';
    } else if (value != parseFloat(value)) {
        errors += '<p>Fill out a valid Value</p>';
    }
    if (errors != "") {

        document.getElementById("errors").style.display = "block";
        document.getElementById("errors").style.backgroundColor = "red";
        document.getElementById("errors").style.color = "white";
        document.getElementById("errors").style.padding = "5px";
        document.getElementById("errors").style.margin = "5px";
        document.getElementById("errors").style.borderRadius = "13px";
        document.getElementById("errors").innerHTML = "<h3>Error: </h3>" + errors;
        return 0;
    } else {
        return 1;
    }

}
function deleteList() {
    if(confirm("Delete this list??")){
        list = [];
        setList(list);
    }

}
function saveListStorage(list) {  // <<<<<<----------
    var jsonStr = JSON.stringify(list);
    localStorage.setItem("list",jsonStr);
}

function initListStorage() {  // <<<<<<----------
    var testList = localStorage.getItem("list");
    if(testList){
        list = JSON.parse(testList);
    }
    setList(list);
}

//setList(list);
//console.log(getTotal(list));
initListStorage();   // <<<<<<----------