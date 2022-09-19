class CreateCompanies < ActiveRecord::Migration[7.0]
  def change
    create_table :companies do |t|
      t.string :type
      t.integer :number_of_employees
      t.string :name
      t.string :email
      t.string :bio
      t.string :location
      t.string :logo

      t.timestamps
    end
    add_index :companies, :email, unique: true
  end
end
