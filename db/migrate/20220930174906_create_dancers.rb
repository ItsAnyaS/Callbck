class CreateDancers < ActiveRecord::Migration[7.0]
  def change
    create_table :dancers do |t|
      t.string :first_name
      t.string :last_name
      t.string :years_of_experience
      t.string :email
      t.string :password_digest

      t.timestamps
    end
    add_index :dancers, :email, unique: true
  end
end
