bootstrap:
	pip install -r requirements.txt

serve:
	PYTHONPATH=. python skycontrol/server.py
