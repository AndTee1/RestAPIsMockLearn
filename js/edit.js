
const urlParam= new URLSearchParams(window.location.search)
const id =urlParam.get('id')
console.log(id);
var urlApiActilce="https://60d2bc7b858b410017b2e1fd.mockapi.io/article"
var urlApiCategory="https://60d2bc7b858b410017b2e1fd.mockapi.io/category"
var listCategory= document.getElementById("category")
let error = document.getElementById('error')
let errorSelect = document.getElementById('errorSelect')
let categorySelect = document.getElementById("category")
let content = document.getElementById("content")
let value
function goInit(){
    
    getCategoryById(id,renderArticle)
    getCategory(renderCategory)
    editForm(id)
    
}
goInit();

function getCategoryById(id,callback){
    console.log(id);
    var param ={
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    };
    fetch(urlApiActilce+'/'+id,param)
    .then(function(res){
        return res.json();
    })
    .then(callback);
}

function renderArticle(category){
    console.log(category);
    let inputCategory = document.getElementById('content')
    let categoryOption = document.querySelector('option')
    inputCategory.innerHTML = category.content
    inputCategory.value = category.content
    categoryOption.innerHTML = category.category
    categoryOption.value = category.category
    value = category.category

}

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

function editCategory(id,data){
    var param ={
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(urlApiActilce+'/'+id, param)
        .then(function(res){
            res.json();
            window.location.href="index.html"
        })
}

function editForm(id){
    renderArticle
    let btnCommit = document.getElementById("confirmBtn")
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
            editCategory(id,data)
        }
        
    }
  
}

function validateForm(){
    content.onkeyup= function(){
        error.style.display = "none";
    }
}