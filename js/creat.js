var listCategory= document.getElementById("category")
let error = document.getElementById('error')
let errorSelect = document.getElementById('errorSelect')
let categorySelect = document.getElementById("category")
let content = document.getElementById("content")
var urlApiCategory="https://60d2bc7b858b410017b2e1fd.mockapi.io/category"
var urlApiActilce="https://60d2bc7b858b410017b2e1fd.mockapi.io/article"
function goInit(){
    getCategory(renderCategory);
    addForm();
    validateForm();
    
}

goInit();

function getCategory(callback){
    fetch(urlApiCategory)
        .then(function(response){
            return response.json();
        })
        .then(callback);
}

function renderCategory(category){
    var htmls = category.map(function(category){
        let categoryOption = document.createElement('option')
        categoryOption.innerHTML = category.category
        categoryOption.value = category.category
        listCategory.appendChild(categoryOption)
        
    })
   
}

function createCategory(data){
    var param ={
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(urlApiActilce, param)
        .then(function(res){
            res.json();
            window.location.href="index.html"
        })
}

function addForm(){
    let btnCommit = document.getElementById("confirmBtn")
    let value =''
    categorySelect.onclick = function(){
        
        value = categorySelect.value

      }
    btnCommit.onclick = function(){
        
        var data ={
            category: value,
            content:content.value
        }

        if(content.value == ''){
            error.style.display = "block";

        }

        if(categorySelect.value=='none'){
            errorSelect.style.display= "block";
        }

        if(content.value != "" && categorySelect.value!='none'){
            createCategory(data)
        }
        
    }
  
}

function validateForm(){
    content.onkeyup= function(){
        error.style.display = "none";
    }
}