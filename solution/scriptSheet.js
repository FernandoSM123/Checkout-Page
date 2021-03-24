var numItems = [0, 0];
var items = ["Vintage Backbag", "Levi Shoes"];
var prices = [new Big(54.99), new Big(74.99)];
var totalItems = 0;
var total = new Big(0.0);

function Client(email, phone, name, address, city, country, postalCode) {
    this.email = email;
    this.phone = phone;
    this.name = name;
    this.address = address;
    this.city = city;
    this.country = country;
    this.postalCode = postalCode;
}

function saveDataInLocalStorage(client) {

    if (client != null) {
        localStorage.setItem("client", JSON.stringify(client));
    }
}

function getDataFromLocalStorage(){
    var data=localStorage.getItem("client");
    if(data!=null){
    var client = JSON.parse(data);
    document.forms["myForm"]["email"].value=client.email;
    document.forms["myForm"]["phone"].value=client.phone;
    document.forms["myForm"]["name"].value=client.name;
    document.forms["myForm"]["address"].value=client.address;
    document.forms["myForm"]["city"].value=client.city;
    document.forms["myForm"]["country"].value=client.country;
    document.forms["myForm"]["postalCode"].value=client.postalCode;
    }
}

function increaseItem(index) {

    numItems[index]++;
    document.getElementById(index).innerHTML = numItems[index];
    totalItems++;
    document.getElementById("numItems").innerHTML = totalItems;

    total = total.plus(prices[index]);
    document.getElementById("total").innerHTML = "$" + total.valueOf();
}

function decreaseItem(index) {

    if (numItems[index] > 0) {
        numItems[index]--;
        document.getElementById(index).innerHTML = numItems[index];
        totalItems--;
        document.getElementById("numItems").innerHTML = totalItems;

        total = total.minus(prices[index]);
        document.getElementById("total").innerHTML = total.valueOf();
    }
}

function getFormData() {
    if (totalItems > 0) {

        document.getElementById("overlay").style.visibility = "visible";

        var email = document.forms["myForm"]["email"].value;
        var phone = document.forms["myForm"]["phone"].value;
        var name = document.forms["myForm"]["name"].value;
        var address = document.forms["myForm"]["address"].value;
        var city = document.forms["myForm"]["city"].value;
        var country = document.forms["myForm"]["country"].value;
        var postalCode = document.forms["myForm"]["postalCode"].value;

        //checkbox
        if (document.forms["myForm"]["checkbox"].checked) {
            saveDataInLocalStorage(new Client(email, phone, name, address, city, country, postalCode));
        }

        document.getElementById("email").innerHTML = email;
        document.getElementById("phone").innerHTML = phone;
        document.getElementById("name").innerHTML = name;
        document.getElementById("address").innerHTML = address;
        document.getElementById("city").innerHTML = city;
        document.getElementById("country").innerHTML = country;
        document.getElementById("postalCode").innerHTML = postalCode;

        var tbody = document.getElementById("table-body");
        deleteAllRows();

        for (var i = 0; i < 2; i++) {
            if (numItems[i] !== 0) {

                var row = tbody.insertRow(-1);
                var name = row.insertCell(0);
                var price = row.insertCell(1);
                var quantify = row.insertCell(2);
                var amount = row.insertCell(3);

                name.innerHTML = items[i];
                price.innerHTML = "$" + prices[i].valueOf();
                quantify.innerHTML = numItems[i];
                amount.innerHTML = "$" + (prices[i].times(numItems[i])).valueOf();
            }
        }
        document.getElementById("cantidad-col").innerHTML = totalItems;
        document.getElementById("total-col").innerHTML = "$" + total.valueOf();
        clearData();
    }
    else {
        alert("ERROR:Compra sin items");
    }
}

function deleteAllRows() {
    var table = document.getElementById("table-body");
    for (var i = 0; i < table.rows.length; i++) {
        table.deleteRow(i);
    }
}

function clearData() {
    document.getElementById("numItems").innerHTML = "0";
    document.getElementById("total").innerHTML = "$0";
    document.getElementById("0").innerHTML = "0";
    document.getElementById("1").innerHTML = "0";
    document.getElementById("myForm").reset();
    numItems = [0, 0];
    totalItems = 0;
    total = new Big(0.0);
}

function closePopUp() {
    document.getElementById("overlay").style.visibility = "hidden";
}