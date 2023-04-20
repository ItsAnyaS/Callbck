class AddAutoUuidToDancers < ActiveRecord::Migration[7.0]
  def change
    add_column :dancers, :uuid, :uuid, default: "gen_random_uuid()"
  end
end
