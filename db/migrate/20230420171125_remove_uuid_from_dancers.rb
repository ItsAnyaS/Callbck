class RemoveUuidFromDancers < ActiveRecord::Migration[7.0]
  def change
    remove_column :dancers, :uuid
  end
end
