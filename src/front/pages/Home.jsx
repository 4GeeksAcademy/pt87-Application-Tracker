import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	const loadMessage = async () => {
		try {
			const backendUrl = import.meta.env.VITE_BACKEND_URL

			if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")
			const apiBase = backendUrl.replace(/\/$/, "")

			const response = await fetch(apiBase + "/api/hello")
			const data = await response.json()

			if (response.ok) dispatch({ type: "set_hello", payload: data.message })

			return data

		} catch (error) {
			if (error.message) throw new Error(
				`Could not fetch the message from the backend.
				Please check if the backend is running and the backend port is public.`
			);
		}

	}

	useEffect(() => {
		loadMessage()
	}, [])

	return (
		<div className="page-surface"git >
			<div className="container py-5">
				{/* HEADER */}
				<div className="text-center mb-5">
					<h1 className="display-5 fw-bold mb-3">Track every step of your job hunt</h1>
					<p className="lead text-muted mx-auto" style={{ maxWidth: 820 }}>
						ApplyTrack keeps your applications, interviews, notes, and next steps in one organized place
						so you can focus on landing the job.
					</p>

					<div className="d-flex justify-content-center gap-3 mt-4 flex-wrap">
						<Link to="/add-job" className="btn btn-primary btn-lg btn-cta">
							<i className="fa-solid fa-plus me-2" />
							Add your first job
						</Link>
						<Link to="/application" className="btn btn-outline-secondary btn-lg">
							View applications
						</Link>
					</div>
				</div>

				{/* BENEFITS CARDS */}
				<div className="row g-4 mb-5">
					{[
						{
							title: "Stay organized",
							text: "Keep all your applications in one place with key details like company, role, location, and date applied.",
							icon: "fa-folder-open",
						},
						{
							title: "Track progress",
							text: "Update statuses as you move through the process: applied, interview, offer, rejected, and more.",
							icon: "fa-chart-line",
						},
						{
							title: "Never miss a step",
							text: "Add notes and next steps so you always know what to follow up on and when.",
							icon: "fa-check-circle",
						},
					].map((card) => (
						<div className="col-md-4" key={card.title}>
							<div className="card h-100 shadow-sm border-0 home-card">
								<div className="card-body p-4">
									<div className="d-flex align-items-center gap-3 mb-3">
										<div className="home-icon">
											<i className={`fa-solid ${card.icon}`} />
										</div>
										<h5 className="card-title mb-0 fw-bold">{card.title}</h5>
									</div>
									<p className="card-text text-muted mb-0">{card.text}</p>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* HOW IT WORKS */}
				<div className="row align-items-center g-4 mb-5">
					<div className="col-lg-6">
						<h2 className="fw-bold mb-3">How it works</h2>
						<div className="d-flex flex-column gap-3">
							{[
								{
									step: "1",
									title: "Add a job application",
									text: "Enter the company, role, and details in seconds.",
								},
								{
									step: "2",
									title: "Update your status as you go",
									text: "Move from applied → interview → offer, with notes and next steps.",
								},
								{
									step: "3",
									title: "See everything at a glance",
									text: "Use the Applications page and Dashboard to stay on top of your search.",
								},
							].map((item) => (
								<div className="d-flex gap-3" key={item.step}>
									<div className="home-step">{item.step}</div>
									<div>
										<div className="fw-bold">{item.title}</div>
										<div className="text-muted">{item.text}</div>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* PREVIEW BOX */}
					<div className="col-lg-6">
						<div className="card shadow-sm border-0 home-preview">
							<div className="card-body p-4">
								<div className="d-flex justify-content-between align-items-center mb-3">
									<div className="fw-bold">Quick preview</div>
									<span className="badge rounded-pill text-bg-light">MVP</span>
								</div>
								<div className="small text-muted mb-3">
									Example of what you’ll track:
								</div>

								<div className="table-responsive">
									<table className="table table-sm align-middle mb-0">
										<thead>
											<tr className="text-muted">
												<th>Company</th>
												<th>Role</th>
												<th>Status</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>Google</td>
												<td>Software Engineer</td>
												<td><span className="badge text-bg-secondary">Applied</span></td>
											</tr>
											<tr>
												<td>Stripe</td>
												<td>Backend Engineer</td>
												<td><span className="badge text-bg-info">Interview</span></td>
											</tr>
											<tr>
												<td>Vercel</td>
												<td>Full Stack</td>
												<td><span className="badge text-bg-success">Offer</span></td>
											</tr>
										</tbody>
									</table>
								</div>

							</div>
						</div>
					</div>
				</div>

				{/* READY TO GO? */}
				<div className="home-cta text-center p-5 rounded-4">
					<h3 className="fw-bold mb-2">Ready to organize your job search?</h3>
					<p className="text-muted mb-4">
						Add your first application and start tracking your progress.
					</p>
					<Link to="/add-job" className="btn btn-primary btn-lg btn-cta">
						<i className="fa-solid fa-plus me-2" />
						Add Job
					</Link>
				</div>
			</div>
		</div>
	);
}; 