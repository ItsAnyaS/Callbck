class AddUuidToCompanies < ActiveRecord::Migration[7.0]
  def change
    add_column :companies, :uuid, :uuid, default: "gen_random_uuid()"
  end
end
