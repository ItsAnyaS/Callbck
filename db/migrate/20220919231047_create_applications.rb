class CreateApplications < ActiveRecord::Migration[7.0]
  def change
    create_table :applications do |t|
      t.integer :listing_id
      t.integer :dancer_id
      t.string :status
      t.string :role
      t.integer :company_id

      t.timestamps
    end
  end
end
