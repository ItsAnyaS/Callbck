class ChangeTypeColumnInCompanyTable < ActiveRecord::Migration[7.0]
  def change
    rename_column :companies, :type, :company_type
  end
end
