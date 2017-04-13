class Todo < ActiveRecord::Base
  validates :todo_content, presence: true
end
