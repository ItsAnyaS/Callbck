class AddGenderToDancers < ActiveRecord::Migration[7.0]
  def change
    add_column :dancers, :gender, :string
  end
end
