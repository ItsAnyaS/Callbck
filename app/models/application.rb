class Application < ApplicationRecord
    belongs_to :dancer
    belongs_to :company
    belongs_to :listing
end
