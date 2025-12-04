import pytest
from fastapi.testclient import TestClient
from src.app import app

client = TestClient(app)

def test_get_activities():
    response = client.get("/activities")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, dict)
    assert len(data) > 0

def test_signup_and_unregister():
    # Use a test activity and email
    activity = list(client.get("/activities").json().keys())[0]
    email = "testuser@example.com"

    # Ensure user is not already signed up
    client.post(f"/activities/{activity}/unregister?email={email}")

    # Sign up
    response = client.post(f"/activities/{activity}/signup?email={email}")
    assert response.status_code == 200
    assert "Signed up" in response.json()["message"]

    # Try duplicate signup
    response_dup = client.post(f"/activities/{activity}/signup?email={email}")
    assert response_dup.status_code == 400

    # Unregister
    response_unreg = client.post(f"/activities/{activity}/unregister?email={email}")
    assert response_unreg.status_code == 200
    assert "Removed" in response_unreg.json()["message"]

    # Unregister again (should fail)
    response_unreg2 = client.post(f"/activities/{activity}/unregister?email={email}")
    assert response_unreg2.status_code == 400

def test_root_redirects_to_static_index():
    response = client.get("/", follow_redirects=False)
    assert response.status_code in (302, 307)
    assert response.headers["location"].endswith("/static/index.html")

def test_signup_activity_not_found():
    response = client.post("/activities/NonexistentActivity/signup?email=test@example.com")
    assert response.status_code == 404
    assert response.json()["detail"] == "Activity not found"

def test_unregister_activity_not_found():
    response = client.post("/activities/NonexistentActivity/unregister?email=test@example.com")
    assert response.status_code == 404
    assert response.json()["detail"] == "Activity not found"

def test_signup_already_registered():
    activity = list(client.get("/activities").json().keys())[0]
    email = "alreadyregistered@example.com"
    # Ensure user is not signed up
    client.post(f"/activities/{activity}/unregister?email={email}")
    # Sign up once
    client.post(f"/activities/{activity}/signup?email={email}")
    # Sign up again (should fail)
    response = client.post(f"/activities/{activity}/signup?email={email}")
    assert response.status_code == 400
    assert response.json()["detail"] == "Student already signed up for this activity"
    # Clean up
    client.post(f"/activities/{activity}/unregister?email={email}")

def test_unregister_not_registered():
    activity = list(client.get("/activities").json().keys())[0]
    email = "notregistered@example.com"
    # Ensure user is not signed up
    client.post(f"/activities/{activity}/unregister?email={email}")
    # Try to unregister (should fail)
    response = client.post(f"/activities/{activity}/unregister?email={email}")
    assert response.status_code == 400
    assert response.json()["detail"] == "Student not registered for this activity"
