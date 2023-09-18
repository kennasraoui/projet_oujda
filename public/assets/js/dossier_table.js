



  function click_show(e,row) {
             
    e.preventDefault();
    var id =row

    var url =APP_URL+'/url_dossier/' + row ;

    window.open(url,'_blank');




}

  function fill_table(){






    var button_show   = '  <svg width="26px" height="26px" viewBox="0 0 32 32" id="icon" xmlns="http://www.w3.org/2000/svg"><defs><style>.cls-1{fill:none;}</style></defs><title>folder--details</title><rect x="16" y="20" width="14" height="2"/><rect x="16" y="24" width="14" height="2"/><rect x="16" y="28" width="7" height="2"/><path d="M14,26H4V6h7.17l3.42,3.41.58.59H28v8h2V10a2,2,0,0,0-2-2H16L12.59,4.59A2,2,0,0,0,11.17,4H4A2,2,0,0,0,2,6V26a2,2,0,0,0,2,2H14Z"/><rect id="_Transparent_Rectangle_" data-name="&lt;Transparent Rectangle&gt;" class="cls-1" width="32" height="32"/></svg>';


    $.ajaxSetup({
        headers: {
          'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
        }
      });

    $.ajax({
        'url': APP_URL+"/api_all_dossier",
        'method': "GET",
        'contentType': 'application/json'
    }).done( function(data) {
        $('#organigramme_table').dataTable( {
            dom: 'Bfrtip',
            buttons: [
              {
                extend: 'copy',
                title: 'La liste des dossiers electroniques archivé dans le systeme',
                exportOptions: {
                  columns: [ 0, 1, 2, 3 ]
                },
              },
              {
                extend: 'excel',
                title: 'La liste des dossiers electroniques archivé dans le systeme',
                exportOptions: {
                  columns: [ 0, 1, 2,3]
                },
              },
              {
                extend: 'pdf',
                title: 'La liste des dossiers electroniques archivé dans le systeme',
                exportOptions: {
                  columns: [ 0, 1, 2,3]
                },
              },
              {
                extend: 'print',
                title: 'La liste des dossiers electroniques archivé dans le systeme',
                exportOptions: {
                  columns: [ 0, 1, 2,3]
                },
              },
            ],
            order: [[0, 'desc']],
            "aaData": data,
            "searching" : false,
            "bInfo" : false,
            "lengthChange": false,
            columnDefs: [
              { targets: 0, width: '120px'  },    
              { targets: 1, width: '130px'  },
              { targets: 2, width: '270px'  },
              { targets: 3, width: '160px'  },
              { targets: 4, width: '100px'  }, ],
            fixedColumns: true,
            
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
             
                { "data": "id"  },
                { "data": "date"  },
                { "data": "titre"  },
                { "data": "user"  },
                { "data": "id"  , render: function(data, type, row) {
                    return '<button class="btn btn-warning" style="padding: 3px 5px;" type="button"  onclick="click_show(event,' + data + ' )"  >'+button_show+'</button>' } 
                }

                 
                ]

		


        })
   
    })

}


$(document).ready(function() {
     
    fill_table();
  

 } );