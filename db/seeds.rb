require 'faker'

20.times do |i|
	Todo.create(todo_content: Faker::Lorem.word, completed: i.even?)
end