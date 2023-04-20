class AddUuidToDancers < ActiveRecord::Migration[7.0]
  def change
    add_column :dancers, :uuid, :uuid
  end
end
