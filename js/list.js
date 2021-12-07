var listCategory= document.getElementById("category")
var urlApiCategory="https://60d2bc7b858b410017b2e1fd.mockapi.io/category"
var urlApiActilce="https://60d2bc7b858b410017b2e1fd.mockapi.io/article"
function goInit(){
    getCategory(renderCategory);
    getArticle(renderArticle);
    createCategory()
    filter();
}
goInit();

//Functions
function getCategory(callback){
    fetch(urlApiCategory)
        .then(function(response){
            return response.json();
        })
        .then(callback);
}

function getArticle(callback){
    fetch(urlApiActilce)
        .then(function(res){
            return res.json();
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

function filter(){
    listCategory.onclick = function(){
        var search, table, tr, i;
        console.log(listCategory.value);
        search = listCategory.value.toUpperCase()
    
        table = document.getElementById("myTabel");
        tr = table.getElementsByTagName("tr");
        
        for (i = 0; i < tr.length; i++) {
            tdUser = tr[i].getElementsByTagName("td")[2];
            if (tdUser) {
                valueUser = tdUser.textContent || tdUser.innerText;
                if (valueUser.toUpperCase().indexOf(search) > -1 ) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }
}

function renderArticle(article){
    var myTbody=document.getElementById("tbody")
    var htmls = article.map(function(article){
        let trElement = document.createElement('tr')

        let tdElementid = document.createElement('td')
        tdElementid.innerHTML = article.id

        let tdElementcontent = document.createElement('td')
        tdElementcontent.innerHTML = article.content

        let tdElementcategory = document.createElement('td')
        tdElementcategory.innerHTML = article.category

        let tdElementAction = document.createElement('td')
        let btnDelete = document.createElement('button')
        btnDelete.innerHTML= 'Xóa'
        btnDelete.value= article.id
        btnDelete.onclick = function(){
            deleteCategory(article.id)
        }
        let btnEdit = document.createElement('button')
        btnEdit.innerHTML= 'Sửa'
        btnEdit.value= article.id
        console.log(btnEdit.value);
        tdElementAction.appendChild(btnDelete)
        tdElementAction.appendChild(btnEdit)


        trElement.appendChild(tdElementid)
        trElement.appendChild(tdElementcontent)
        trElement.appendChild(tdElementcategory)
        trElement.appendChild(tdElementAction)

        myTbody.appendChild(trElement)
    })

}

function deleteCategory(id){
    console.log(id);
    var param ={
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    };
    fetch(urlApiActilce+'/'+id,param)
    .then(function(res){
        res.json();
        var myTbody=document.getElementById("tbody").innerHTML=''
        getArticle(renderArticle)
    })
   
   
}
function createCategory(){
    var btnAdd = document.getElementById("btnAdd");
    btnAdd.onclick = function () {
        window.location.href="CreatCategory.html"
        
    }
}

