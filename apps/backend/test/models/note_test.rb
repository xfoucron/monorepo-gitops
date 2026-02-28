require "test_helper"

class NoteTest < ActiveSupport::TestCase
  test "title should not be blank" do
    note = Note.new(title: "", content: "")

    assert_not note.valid?
    assert note.errors.added?(:title, :blank)
  end

  test "content should not be blank" do
    note = Note.new(title: "", content: "")

    assert_not note.valid?
    assert note.errors.added?(:content, :blank)
  end

  test "title should have a minimum length" do
    note = Note.new(title: "mi", content: "")

    assert_not note.valid?
    assert note.errors.of_kind?(:title, :too_short)
  end

  test "title should have a maximum length" do
    note = Note.new(title: "A" * 25, content: "")

    assert_not note.valid?
    assert note.errors.of_kind?(:title, :too_long)
  end

  test "content should have a maximum length" do
    note = Note.new(title: "A" * 25, content: "A" * 384)

    assert_not note.valid?
    assert note.errors.of_kind?(:content, :too_long)
  end

  test "validate a valid note" do
    note = Note.new(title: "my note", content: "here is my life")

    assert note.valid?
  end
end
