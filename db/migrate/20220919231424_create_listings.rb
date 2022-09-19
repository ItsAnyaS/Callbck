class CreateListings < ActiveRecord::Migration[7.0]
  def change
    create_table :listings do |t|
      t.string :title
      t.text :description
      t.string :style, default: [], array: true
      t.string :dancer_gender, default: [], array: true
      t.string :compensation
      t.string :image
      t.string :location
      t.datetime :rehersal_start_date
      t.datetime :show_date_start
      t.integer :years_of_expirence
      t.integer :company_id

      t.timestamps
    end
  end
end
