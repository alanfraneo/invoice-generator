$(document).ready(function() {
    $("#invoicedate").text($("#invoicedate").text()+moment().format('DD MMM, YYYY'));
})


var tx = document.getElementsByTagName('textarea');
for (var i = 0; i < tx.length; i++) {
  tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) + 'px;overflow-y:hidden;');
  tx[i].addEventListener("input", OnInput, false);
}

function OnInput() {
  this.style.height = 'auto';
  this.style.height = (this.scrollHeight) + 'px';
}


function getItemHTML(itemname, itemdesc, itemcost){
	return `<div class="item">
                    <div class="namedesc">
                        <div class="name">${itemname}</div>
                        <div class="desc">${itemdesc}</div>
                    </div>
                    <div class="itemcost">Rs ${itemcost}</div>
                    <div class="menu">
                        <div class="remove" onclick="removeItem(this)">
                            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                                <path fill="#000000" d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" />
                            </svg>
                        </div>
                        <div class="edit" onclick="editItem(this)">
                            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                                <path fill="#000000" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
                            </svg>
                        </div>
                    </div>
                </div>`;	
}

function removeItem(obj){
    $(obj).closest(".item").remove();
    updatetotalamt();
}

function editItem(obj){
    console.log(obj);
    var name = $($(obj).closest(".item").find(".name")[0]).text()
    var desc = $($(obj).closest(".item").find(".desc")[0]).text()
    var cost = $($(obj).closest(".item").find(".itemcost")[0]).text().split("Rs ")[1];
	$("#nameinput").val(name);
	$("#descinput").val(desc);
	$("#amountinput").val(cost);
    removeItem(obj);
    $(".additem-label").text("Edit Item");
    $("#additembtn").text("Save Item");
}

function additem(){
	var itemname = $("#nameinput").val();
	var itemdesc = $("#descinput").val();
	var itemcost = $("#amountinput").val();
    if (itemname && itemdesc && itemcost) {
        if (isInt(itemcost)) {
            document.getElementById("itemlist").innerHTML += getItemHTML(itemname, itemdesc, itemcost);
            updatetotalamt();
            clearform();            
        }
        else{
            alert("Item cost must be an integer.");
        }
    }else{
        alert("Please fill the form completely.")
    }
}

function isInt(value) {
  return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
}

function clearform(){
	$("#nameinput").val("");
	$("#descinput").val("");
	$("#amountinput").val("");
    $(".additem-label").text("Add Item");
    $("#additembtn").text("Add Item");
}

function updatetotalamt(){
	var total = 0;
	var amounts = $(".itemcost");
	for (var i = 0; i < amounts.length; i++) {
		total += parseInt(amounts[i].innerText.split(" ")[1]);
	}
	$("#totalamt").text("Rs "+ total);
}