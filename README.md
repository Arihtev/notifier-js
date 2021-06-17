# Notifier

## Installation

```
npm install
```

---

## How to use

- `npm start` - starts the local server with the 'dev' prefix
- `npm test` - runs all unit tests and generates coverage report

---

## Publish a message to SNS

Local SNS is running on port 4002.

```bash
aws --endpoint-url http://localhost:4002 sns publish --topic-arn "arn:aws:sns:{region}:123456789012:{topic-name}" --message "$(cat ./path/to/file.json;)" --region {region} --profile {profile}
```
