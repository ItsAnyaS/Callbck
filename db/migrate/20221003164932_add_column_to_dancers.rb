class AddColumnToDancers < ActiveRecord::Migration[7.0]
  def change
    add_column :dancers, :dance_reel, :string
  end
end
