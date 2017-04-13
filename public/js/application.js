$(document).ready(function() {
  bindEvents();
});


function bindEvents() {
  $('#form').on('submit', createTodo)
  $('#todo').on('click', '.delete', deleteTodo)
  $('#todo').on('click', '.complete', completeTodo)
  $("#todo").on('dragstart', '.todo', handleDragStart)
  $("#todo").on('dragenter', '.todo', handleDragEnter)
  $("#todo").on('dragend', '.todo', handleDragEnd)
  $(".complete-footer, .delete-footer").on('dragover', handleDragAllow)
  $(".complete-footer").on('drop dragdrop', handleDragDropComplete)
  $(".delete-footer").on('drop dragdrop', handleDragDropDelete)
}

function buildTodo(todoName) {
  // Eso nos ta un pedazo del DOM
  var todoTemplate = $.trim($('#todo_template').html());
  // Creamos un elemento de jquery a partir del template
  var $todo = $(todoTemplate);
  // Modificamos el texto con el que nos pasen como argumento
  $todo.find('h2').text(todoName);
  // Devuelve el elemento de jquery para ser usado en otra parte.
  return $todo;
}


// Create Todo
function createTodo(e) {
  e.preventDefault();

  var url = this.action
  var form = this

  var request = $.ajax({
    type: 'POST',
    url : url,
    data: $(this).serialize()
  })

  request.done(function(response){
    $('#todo_template').append(response);
  });

  request.then(function(){
    $('.done').fadeIn().delay(1300).fadeOut();
    $(form).find('#todo_name').val('')

  })
}

// Delete Todo
function deleteTodo(e) {
  e.preventDefault()
  var url = this.href,
    request = $.ajax({
    method: 'DELETE',
    url: url
  });

  request.done(function(response) {
    document.getElementById(response.todo.id).remove();
  })
}

// Complete Todo
function completeTodo(e) {
  e.preventDefault()
  var url = this.href;

  var request = $.ajax({
        method: 'GET',
        url: url,
  });

  request.done(function(response) {
    $(`#${response.todo.id}`).find('.incomplete').addClass('completed');
    $(`#${response.todo.id}`).find('.complete').closest('li').remove();
  })
}

// Drag Events

function handleDragStart(e) {
  e.originalEvent.dataTransfer.setData("text", e.target.id)
  this.style.opacity = '0.5';
}

function handleDragEnter(e) {
  e.preventDefault();
  $(this).addClass('move')
}

function handleDragEnd(e) {
  e.preventDefault();
  $('.todo').removeClass('move')
  this.style.opacity = '1';
}

function handleDragAllow(e) {
  e.preventDefault();
}

function handleDragDropComplete(e) {
  e.preventDefault()
  var data = e.originalEvent.dataTransfer.getData("text")
  var item = $(`#${data}`)
  var url = $(item).find('.complete').attr('href')

  var request = $.ajax({
        method: 'GET',
        url: url,
  });

  request.done(function(response) {
    $(`#${response.todo.id}`).find('.incomplete').addClass('completed');
    $(`#${response.todo.id}`).find('.complete').closest('li').remove();
  })
}

function handleDragDropDelete(e) {
  e.preventDefault()
  var data = e.originalEvent.dataTransfer.getData("text")
  var item = $(`#${data}`)
  var url = $(item).find('.delete').attr('href')

  var request = $.ajax({
    method: 'DELETE',
    url: url
  });

  request.done(function(response) {
    document.getElementById(response.todo.id).remove();
  })
}