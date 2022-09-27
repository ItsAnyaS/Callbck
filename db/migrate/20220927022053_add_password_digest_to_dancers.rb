class AddPasswordDigestToDancers < ActiveRecord::Migration[7.0]
  def change
    add_column :dancers, :password_digest, :string
  end
end
