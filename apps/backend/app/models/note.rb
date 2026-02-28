class Note < ApplicationRecord
  validates :title, presence: true, length: { minimum: 3, maximum: 24 }
  validates :content, presence: true, length: { maximum: 256 }
end
