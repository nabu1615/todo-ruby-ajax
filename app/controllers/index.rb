
#Show All
get '/' do
	p @todos = Todo.all
	erb :index
end

#Delete Todo

delete '/todo/:id' do
	todo = Todo.find_by(id: params[:id])
	todo.destroy
	content_type 'application/json'
	{todo: todo}.to_json
end

# Complete Todo
get '/todo/:id/completed' do
	todo = Todo.find_by(id: params[:id])
	todo.completed = true
	if todo.save 
		content_type 'application/json'
		{todo: todo}.to_json
	end
end

# Create Todo
post '/add_todo' do
	@todo = Todo.new(todo_content: params[:name])
	if @todo.save
		erb :_todo, :layout => false
	else
		@errors = @note.errors.full_messages
	end
end
