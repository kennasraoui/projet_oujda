        function remove_user(e,row) {


          e.preventDefault();



          if(confirm('Êtes-vous sûr?')) {

                $.ajax({
                  url:APP_URL+"/inventaire_destroy/"+row,
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

          }



  function click_edit(e,row) {
             
    e.preventDefault();
    var id =row

    location.href=APP_URL+'/inventaire_details/' + row ;






}

  function fill_table(){




        var button_delete = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">';
        button_delete += '<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>';
        button_delete += '<path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/> </svg>';



    var button_show   = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">';

      button_show += '<path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>';

      button_show  += '</svg>';




    $.ajaxSetup({
        headers: {
          'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
        }
      });

    $.ajax({
        'url': APP_URL+"/table_organigramme",
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
    
            "columns": [

                
             
                { "data": "nom"  },
               
                { "data": "id"  , render: function(data, type, row) {
                    return '<button type="button" class="btn btn-primary"   onclick="click_edit(event,' + data + ' )" >'+button_delete+'</button>' } 
                }

                 
                ]

		


        })
   
    })

}


$(document).ready(function() {
     
    fill_table();

 } );