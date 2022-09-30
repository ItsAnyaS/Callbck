require "application_system_test_case"

class DancersTest < ApplicationSystemTestCase
  setup do
    @dancer = dancers(:one)
  end

  test "visiting the index" do
    visit dancers_url
    assert_selector "h1", text: "Dancers"
  end

  test "should create dancer" do
    visit dancers_url
    click_on "New dancer"

    fill_in "Email", with: @dancer.email
    fill_in "First name", with: @dancer.first_name
    fill_in "Last name", with: @dancer.last_name
    fill_in "Years of experience", with: @dancer.years_of_experience
    click_on "Create Dancer"

    assert_text "Dancer was successfully created"
    click_on "Back"
  end

  test "should update Dancer" do
    visit dancer_url(@dancer)
    click_on "Edit this dancer", match: :first

    fill_in "Email", with: @dancer.email
    fill_in "First name", with: @dancer.first_name
    fill_in "Last name", with: @dancer.last_name
    fill_in "Years of experience", with: @dancer.years_of_experience
    click_on "Update Dancer"

    assert_text "Dancer was successfully updated"
    click_on "Back"
  end

  test "should destroy Dancer" do
    visit dancer_url(@dancer)
    click_on "Destroy this dancer", match: :first

    assert_text "Dancer was successfully destroyed"
  end
end
