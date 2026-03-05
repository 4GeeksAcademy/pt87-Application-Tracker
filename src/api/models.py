from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Date
from sqlalchemy.orm import Mapped, mapped_column
from datetime import date

db = SQLAlchemy()


class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(
        String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }


class Application(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)

    company: Mapped[str] = mapped_column(String(120), nullable=False)
    role: Mapped[str] = mapped_column(String(120), nullable=False)
    location: Mapped[str] = mapped_column(String(120), nullable=True)

    applied_date: Mapped[date] = mapped_column(Date, nullable=True)

    status: Mapped[str] = mapped_column(
        String(50), nullable=False, default="Applied")

    notes: Mapped[str] = mapped_column(String(500), nullable=True)

    employment_type: Mapped[str] = mapped_column(String(50), nullable=True)

    def serialize(self):
        return {
            "id": self.id,
            "company": self.company,
            "role": self.role,
            "location": self.location,
            "applied_date": self.applied_date.isoformat() if self.applied_date else None,
            "status": self.status,
            "notes": self.notes,
            "employment_type": self.employment_type
        }
