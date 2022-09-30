class AddLocationToDancers < ActiveRecord::Migration[7.0]
  def change
    add_column :dancers, :location, :string
  end
end
