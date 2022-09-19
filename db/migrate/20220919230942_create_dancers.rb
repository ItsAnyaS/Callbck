class CreateDancers < ActiveRecord::Migration[7.0]
  def change
    create_table :dancers do |t|
      t.string :first_name
      t.string :last_name
      t.string :gender
      t.string :dance_style
      t.string :email
      t.string :location

      t.timestamps
    end
    add_index :dancers, :email, unique: true
  end
end
