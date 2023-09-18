function demande_cloture(e,id_pret) {
   
  e.preventDefault();

  if(confirm('ÃŠtes-vous sÃ»r?')) {
   


    $.ajax({
      url:APP_URL+"/update_status",
      method:"POST",
      data:{
        status : 3,
        id_prets : id_pret ,
     
      },
      success:function(data){


        if(data.etat){
              $('#organigramme_table').DataTable().destroy();
              fill_table()
        }
    

      }
    })
   }
     




}


function demande_rejeter(e,id_pret) {
   
  e.preventDefault();

  if(confirm('ÃŠtes-vous sÃ»r?')) {
   


    $.ajax({
      url:APP_URL+"/update_status",
      method:"POST",
      data:{
        status : 2,
        id_prets : id_pret ,
     
      },
      success:function(data){


        if(data.etat){
              $('#organigramme_table').DataTable().destroy();
              fill_table()
        }
    

      }
    })
   }
     




}

function accepeter_demande(e,id_pret) {
             
  e.preventDefault();
  if(confirm('ÃŠtes-vous sÃ»r?')) {
           
          $.ajax({
            url:APP_URL+"/update_status",
            method:"POST",
            data:{
              status : 1,
              id_prets : id_pret ,
            },
            success:function(data){


              if(data.etat){
                    $('#organigramme_table').DataTable().destroy();
                    fill_table();
        
                    alert('supprimer avec succes');
                  

              }
          

            }
          })


    }




}




function remove(e,row) {


  e.preventDefault();



  $.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
    }
    });

    $.ajax({
      url:APP_URL+"/prets_delete/"+row,
      method:"POST",
      data:{
        items_delete : row
      },
      success:function(data){

        

          console.log(data.data)

        if(data.etat){

          

              $('#organigramme_table').DataTable().destroy();
              fill_table()
              

        
                                  
          
              alert('supprimer avec succes');
            

        }
    

      }
    })




}



function click_edit(e,row) {
     
e.preventDefault();
var id =row



window.open(APP_URL+'/prets_show/' + row, 'name'); 







}

function fill_table(){


  var button_lock = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lock" viewBox="0 0 16 16">';

  button_lock += ' <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/>';

  button_lock +=' </svg>';


var button_delete = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">';
button_delete += '<path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"></path>';
button_delete += '<path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"></path> </svg>';



var button_show   = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">';

button_show += '<path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>';

button_show  += '</svg>';



var button_delete1 = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>';

button_delete1 += '</svg>';



var button_show1   = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="8" y1="12" x2="16" y2="12"></line>';



button_show1  += '</svg>';








$.ajaxSetup({
headers: {
  'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
}
});

$.ajax({
'url': APP_URL+"/api_prets",
'method': "GET",
'contentType': 'application/json'
}).done( function(data) {
$('#organigramme_table').dataTable( {
    "aaData": data,
    "bInfo" : false,
    "lengthChange": false,
    columnDefs: [
        {
            targets: -1,
            data: null,
            defaultContent: '<button>Click!</button>',
        },
    ],
    
    "paginate": {
        "first": "PremiÃ¨re",
        "last": "DerniÃ¨re",
        "next": "Suivante",
        "previous": "PrÃ©cÃ©dente"
    },
    "oLanguage": {
      "sUrl": APP_URL+"/assets/fr-FR.json"
    },
    order: [[0, 'desc']],
    "columns": [
        { "data": "id"  },
        { "data": "created_at"  },
        { "data": "user"  },
        { "data": "division"  },
        { "data": "objet"  },
        { "data": "status"  , render: function(data, type, row) {
            switch(data) {
              case 0:
               return '<span class="badge  badge-primary">En cours</span>' ;
                
              case 1:
                return '<span class="badge badge-success">Accepté</span>' ;
              case 2:
                return '<span class="badge badge-danger">Rejeté</span>' ;
              case 3:
                  return '<span class="badge badge-warning">Clôturé</span>' ;
            
            }
         
        }},
        { "data": null  , render: function(data, type, row, meta) {
            if(row.status == 1){
              if(!permisssion_gestion_prets){
                return '<button type="button" class="btn btn-danger mr-3"   onclick="demande_cloture(event,' + row.id + ' )" >'+button_lock+'</button><button type="button" class="btn btn-primary"   onclick="click_edit(event,' + row.id + ' )" >'+button_delete+'</button>' 
              } else {
                return ''
              }
             
            }else if(row.status == 0){
              if(permisssion_validation_prêts){
                return '<button type="button" class="btn btn-danger mr-3 " onclick="demande_rejeter(event , ' + row.id + ' , ' + row.id + ' )"  >'+button_show1+'</button><button type="button" class="btn btn-primary"   onclick="accepeter_demande(event,' + row.id + ' , ' + row.id + ' )" >'+button_delete1+'</button>' 
              }else 
              return ''
              
            } else {
              return '';
            }
          }
            
        },
        

         
        ]




})

})

}


$(document).ready(function() {

fill_table();

} );