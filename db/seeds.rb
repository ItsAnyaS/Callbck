# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)


50.times do
    Listing.create(
      title: Faker::Lorem.sentence(word_count: 8),
      description: Faker::Lorem.paragraph(sentence_count: 2),
      style: ["ballet", "tap", "jazz"].sample,
      dancer_gender: ["male", "female", "nonbinary"].sample,
      compensation: Faker::Number.within(range: 500..2000),
      image: "",
      location: "11220",
      rehersal_start_date: Faker::Time.between_dates(from: Date.today, to: Date.today + 1.year, period: :day),
      show_date_start: Faker::Time.between_dates(from: Date.today, to: Date.today + 1.year, period: :day),
      years_of_expirence: Faker::Number.within(range: 1..20),
      company_id: Company.first.id
    )
  end
  
