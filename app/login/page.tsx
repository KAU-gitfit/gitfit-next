"use client";

export default function LoginPage() {
    const handleLogin = () => {
        window.location.href =
            "https://api.gitfit.site/oauth2/authorization/github";
    };

    return (
        <div style={{ padding: "40px", textAlign: "center" }}>
            <h2>GitFit 로그인</h2>
            <button
                onClick={handleLogin}
                style={{
                    marginTop: "20px",
                    padding: "12px 24px",
                    fontSize: "16px",
                    borderRadius: "8px",
                    background: "black",
                    color: "white",
                }}
            >
                Login with GitHub
            </button>
        </div>
    );
}
