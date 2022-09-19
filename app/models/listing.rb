class Listing < ApplicationRecord
    belongs_to :company
    has_many :applications
end
